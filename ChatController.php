<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminChatController extends Controller
{
    // Ajuste ici si tes tables sont sans oc_
    protected string $tblChats         = 'chats';
    protected string $tblCustomers     = 'customers';
    protected string $tblUsers         = 'users';
    protected string $tblChatMessages  = 'chat_messages';
    protected string $tblBanList       = 'ban_lists';
    protected string $tblBannedChats   = 'banned_chats';
    protected string $tblBanHistory    = 'chat_ban_history';

    private function respond(string $message = '', int $code = 200, $data = null)
    {
        return response()->json([
            'success' => $code >= 200 && $code < 300,
            'message' => $message,
            'data'    => $data,
        ], $code, [], JSON_UNESCAPED_UNICODE);
    }

    private function assetUrl(?string $path): ?string
    {
        if (!$path) return null;
        if (Str::startsWith($path, ['http://', 'https://'])) return $path;

        // ex: https://roogr.sa
        $base = rtrim(config('app.asset_url') ?: config('app.url'), '/');
        return $base . '/' . ltrim($path, '/');
    }

    private function pagination(Request $request): array
    {
        $page  = max(0, (int) $request->query('page', 0));
        $limit = (int) $request->query('limit', 8);
        $limit = ($limit > 0 && $limit <= 100) ? $limit : 8;
        $offset = $page * $limit;
        return [$page, $limit, $offset];
    }

    /**
     * GET /api/v1/admin/chats/user/{userId}
     */
    public function byUser(Request $request, int $userId)
    {
        [$page, $limit, $offset] = $this->pagination($request);

        $rows = DB::table($this->tblChats . ' as ch')
            ->select([
                'ch.chat_id as id',
                'ch.date_added',
                'c.customer_id as customer_id',
                'c.firstname as customer_first_name',
                'c.lastname as customer_last_name',
                'a.customer_id as advertizer_id',
                'a.firstname as advertizer_first_name',
                'a.lastname as advertizer_last_name',
            ])
            ->leftJoin($this->tblCustomers . ' as c', 'c.customer_id', '=', 'ch.customer_id')
            ->leftJoin($this->tblCustomers . ' as a', 'a.customer_id', '=', 'ch.advertizer_id')
            ->where(function ($q) use ($userId) {
                $q->where('ch.customer_id', $userId)
                  ->orWhere('ch.advertizer_id', $userId);
            })
            ->orderByDesc('ch.chat_id')
            ->limit($limit)
            ->offset($offset)
            ->get();

        return $this->respond('success', 200, $rows);
    }

    /**
     * GET /api/v1/admin/chats/user/{userId}/count
     */
    public function countByUser(Request $request, int $userId)
    {
        $count = DB::table($this->tblChats)
            ->where('customer_id', $userId)
            ->orWhere('advertizer_id', $userId)
            ->count();

        return $this->respond('success', 200, ['count' => $count]);
    }

    /**
     * GET /api/v1/admin/chats/{id}
     */
    public function show(Request $request, int $id)
    {
        $row = DB::table($this->tblChats . ' as ch')
            ->select([
                'ch.chat_id as id',
                'ch.date_added',

                'c.customer_id as customer_id',
                'c.firstname as customer_first_name',
                'c.lastname as customer_last_name',
                'a.customer_id as advertizer_id',
                'a.firstname as advertizer_first_name',
                'a.lastname as advertizer_last_name',

                'c.profile as customer_image',
                'a.profile as advertizer_image',

                DB::raw("CASE WHEN cbl.telephone IS NULL THEN 0 ELSE 1 END as customer_banned"),
                DB::raw("CASE WHEN abl.telephone IS NULL THEN 0 ELSE 1 END as advertizer_banned"),
            ])
            ->leftJoin($this->tblCustomers . ' as c', 'c.customer_id', '=', 'ch.customer_id')
            ->leftJoin($this->tblCustomers . ' as a', 'a.customer_id', '=', 'ch.advertizer_id')
            ->leftJoin($this->tblBanList . ' as cbl', 'cbl.telephone', '=', 'c.telephone')
            // IMPORTANT: join correct (pas advertizer.telephone = advertizer.telephone)
            ->leftJoin($this->tblBanList . ' as abl', 'abl.telephone', '=', 'a.telephone')
            ->where('ch.chat_id', $id)
            ->first();

        if (!$row) {
            return $this->respond('chat not found', 404, null);
        }

        $row->customer_image  = $this->assetUrl($row->customer_image);
        $row->advertizer_image = $this->assetUrl($row->advertizer_image);

        return $this->respond('success', 200, $row);
    }

    /**
     * GET /api/v1/admin/chats/{id}/messages
     */
    public function messages(Request $request, int $id)
    {
        [$page, $limit, $offset] = $this->pagination($request);

        // Optionnel: vérifier que le chat existe
        $exists = DB::table($this->tblChats)->where('chat_id', $id)->exists();
        if (!$exists) {
            return $this->respond('chat not found', 404, null);
        }

        $rows = DB::table($this->tblChatMessages . ' as m')
            ->select([
                'm.message_id',
                'm.chat_id',
                'm.text',
                'm.attachment',
                'm.date_added',
                'm.status',
                'm.from_id',
                'm.to_id',

                'uf.customer_id as from_customer_id',
                DB::raw("CONCAT(uf.firstname,' ',uf.lastname) as from_name"),
                'ut.customer_id as to_customer_id',
                DB::raw("CONCAT(ut.firstname,' ',ut.lastname) as to_name"),
            ])
            ->leftJoin($this->tblCustomers . ' as uf', 'uf.customer_id', '=', 'm.from_id')
            ->leftJoin($this->tblCustomers . ' as ut', 'ut.customer_id', '=', 'm.to_id')
            ->where('m.chat_id', $id)
            ->orderByDesc('m.message_id')
            ->limit($limit)
            ->offset($offset)
            ->get();

        // si attachment est un path relatif, le rendre URL
        foreach ($rows as $r) {
            $r->attachment = $this->assetUrl($r->attachment);
        }

        return $this->respond('success', 200, $rows);
    }

    /**
     * GET /api/v1/admin/chats/status/{status}  (banned|unbanned)
     */
    public function byStatus(Request $request, string $status)
    {
        $allowed = ['banned', 'unbanned'];
        if (!in_array($status, $allowed, true)) {
            return $this->respond('invalid status, must be banned or unbanned', 422, null);
        }

        [$page, $limit, $offset] = $this->pagination($request);

        $q = DB::table($this->tblChats . ' as ch')
            ->select([
                'ch.chat_id as id',
                'ch.date_added',

                'c.customer_id as customer_id',
                'c.firstname as customer_first_name',
                'c.lastname as customer_last_name',
                'a.customer_id as advertizer_id',
                'a.firstname as advertizer_first_name',
                'a.lastname as advertizer_last_name',

                'bc.ban_id',
                'bc.ban_reason',
                DB::raw("CONCAT(u.firstname,' ',u.lastname) as admin_name"),
            ])
            ->leftJoin($this->tblCustomers . ' as c', 'c.customer_id', '=', 'ch.customer_id')
            ->leftJoin($this->tblCustomers . ' as a', 'a.customer_id', '=', 'ch.advertizer_id')
            ->leftJoin($this->tblBannedChats . ' as bc', 'bc.chat_id', '=', 'ch.chat_id')
            ->leftJoin($this->tblUsers . ' as u', 'u.user_id', '=', 'bc.banned_by');

        if ($status === 'banned') {
            $q->whereNotNull('bc.ban_id');
        } else {
            $q->whereNull('bc.ban_id');
        }

        $rows = $q->orderByDesc('ch.chat_id')
            ->limit($limit)
            ->offset($offset)
            ->get();

        return $this->respond('success', 200, $rows);
    }

    /**
     * GET /api/v1/admin/chats/status/{status}/count
     */
    public function countByStatus(Request $request, string $status)
    {
        $allowed = ['banned', 'unbanned'];
        if (!in_array($status, $allowed, true)) {
            return $this->respond('invalid status, must be banned or unbanned', 422, null);
        }

        if ($status === 'banned') {
            $count = DB::table($this->tblBannedChats)->count();
        } else {
            // total chats - banned chats
            $total = DB::table($this->tblChats)->count();
            $banned = DB::table($this->tblBannedChats)->count();
            $count = max(0, $total - $banned);
        }

        return $this->respond('success', 200, ['count' => $count]);
    }

    /**
     * GET /api/v1/admin/chats/user/{userId}/history
     */
    public function historyByUser(Request $request, int $userId)
    {
        $chatIds = DB::table($this->tblChats)
            ->where('customer_id', $userId)
            ->orWhere('advertizer_id', $userId)
            ->pluck('chat_id')
            ->all();

        if (empty($chatIds)) {
            return $this->respond('success', 200, []);
        }

        $rows = DB::table($this->tblBanHistory . ' as h')
            ->select([
                'h.created_at',
                'h.reason',
                'h.banned',
                'h.chat_id',
                DB::raw("CONCAT(u.firstname,' ',u.lastname) as admin"),

                'c.customer_id as customer_id',
                DB::raw("CONCAT(c.firstname,' ',c.lastname) as customer_name"),
                'a.customer_id as advertizer_id',
                DB::raw("CONCAT(a.firstname,' ',a.lastname) as advertizer_name"),
            ])
            ->leftJoin($this->tblUsers . ' as u', 'u.user_id', '=', 'h.admin_id')
            ->leftJoin($this->tblChats . ' as ch', 'ch.chat_id', '=', 'h.chat_id')
            ->leftJoin($this->tblCustomers . ' as c', 'c.customer_id', '=', 'ch.customer_id')
            ->leftJoin($this->tblCustomers . ' as a', 'a.customer_id', '=', 'ch.advertizer_id')
            ->whereIn('h.chat_id', $chatIds)
            ->orderByDesc('h.created_at')
            ->get();

        return $this->respond('success', 200, $rows);
    }

    /**
     * PATCH /api/v1/admin/chats/{id}/ban  (toggle)
     * Body: { "reason": "..." }
     */
    public function toggleBan(Request $request, int $id)
    {
        $reason = (string) ($request->input('reason', ''));

        $chatExists = DB::table($this->tblChats)->where('chat_id', $id)->exists();
        if (!$chatExists) {
            return $this->respond('chat not found', 404, null);
        }

        // admin id
        $adminId = (int) optional($request->user())->user_id; // adapte si ton user id est "id"
        if ($adminId <= 0) {
            $adminId = (int) optional($request->user())->id;
        }

        $ban = DB::table($this->tblBannedChats)
            ->where('chat_id', $id)
            ->first();

        if ($ban) {
            // unban
            DB::table($this->tblBannedChats)->where('chat_id', $id)->delete();

            DB::table($this->tblBanHistory)->insert([
                'chat_id'   => $id,
                'banned'    => 0,
                'admin_id'  => $adminId,
                'reason'    => $reason,
                'created_at'=> now(),
            ]);

            return $this->respond('chat is unbanned now', 200, null);
        }

        // ban
        DB::table($this->tblBannedChats)->insert([
            'chat_id'    => $id,
            'ban_reason' => $reason,
            'banned_by'  => $adminId,
            'created_at' => now(),
        ]);

        DB::table($this->tblBanHistory)->insert([
            'chat_id'   => $id,
            'banned'    => 1,
            'admin_id'  => $adminId,
            'reason'    => $reason,
            'created_at'=> now(),
        ]);

        return $this->respond('chat is banned now', 200, null);
    }

    /**
     * DELETE /api/v1/admin/chats/{id}
     */
    public function destroy(Request $request, int $id)
    {
        $chat = DB::table($this->tblChats)->where('chat_id', $id)->first();
        if (!$chat) {
            return $this->respond('chat not found', 404, null);
        }

        DB::table($this->tblChatMessages)->where('chat_id', $id)->delete();
        DB::table($this->tblBannedChats)->where('chat_id', $id)->delete();
        DB::table($this->tblBanHistory)->where('chat_id', $id)->delete();
        DB::table($this->tblChats)->where('chat_id', $id)->delete();

        return $this->respond('chat deleted with its messages', 200, null);
    }
}
