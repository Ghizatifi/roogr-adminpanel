<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SettingsImagesController extends Controller
{
    
    // Même whitelist que Slim
    private const IMAGES_CONFIG_KEYS = [
        'config_admin_image',
        'config_inquiry_image',
        'config_communication_image',
        'config_suggestion_image',
    ];

    /**
     * Base URL pour les fichiers (équivalent FileHelper::SERVERBASE).
     * Ajuste selon ton infra :
     * - soit ASSET_URL dans .env
     * - soit APP_URL
     */
    private function serverBase(): string
    {
        $base = config('app.asset_url') ?: config('app.url');
        return rtrim($base, '/') . '/';
    }

    public function index()
    {
        $rows = DB::table('oc_setting')
            ->select(['setting_id', 'store_id', 'code', 'key', 'value', 'serialized'])
            ->whereIn('key', self::IMAGES_CONFIG_KEYS)
            ->get();

        $serverBase = $this->serverBase();

        $data = $rows->map(function ($row) use ($serverBase) {
            // Préfixe FileHelper::SERVERBASE
            $row->value = $serverBase . ltrim((string) $row->value, '/');
            return $row;
        });

        return response()->json([
            'success' => true,
            'message' => 'images config',
            'data'    => $data,
        ], 200, [], JSON_UNESCAPED_UNICODE);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key'   => ['required', 'string', 'in:' . implode(',', self::IMAGES_CONFIG_KEYS)],
            'value' => ['required', 'string'],
        ]);

        $key = $validated['key'];
        $value = $validated['value'];
        $serverBase = $this->serverBase();

        // 1) Si value commence par SERVERBASE => on strip pour stocker un path relatif
        // 2) Sinon => on suppose base64 et on sauvegarde dans /public/catalog/
        if (Str::startsWith($value, $serverBase)) {
            $imagePath = ltrim(Str::replaceFirst($serverBase, '', $value), '/');
        } else {
            $imagePath = $this->saveBase64ToPublicCatalog($value);
        }

        // Important : oc_setting dans OpenCart utilise souvent (store_id, code, key).
        // Ici on force store_id=0 et code='config' comme ton Slim.
        $existing = DB::table('oc_setting')
            ->where('store_id', 0)
            ->where('code', 'config')
            ->where('key', $key)
            ->first();

        if ($existing) {
            DB::table('oc_setting')
                ->where('setting_id', $existing->setting_id)
                ->update([
                    'value'      => $imagePath,
                    'serialized' => 0,
                ]);
        } else {
            DB::table('oc_setting')->insert([
                'store_id'    => 0,
                'code'        => 'config',
                'key'         => $key,
                'value'       => $imagePath,
                'serialized'  => 0,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Image config updated',
            'data'    => null,
        ], 201, [], JSON_UNESCAPED_UNICODE);
    }

    /**
     * Sauvegarde une image base64 dans public/catalog/
     * Retourne le chemin relatif : catalog/xxxxx.ext
     */
    private function saveBase64ToPublicCatalog(string $base64): string
    {
        // Exemple attendu: "data:image/png;base64,AAAA..."
        if (!preg_match('#^data:image/(png|jpeg|jpg|webp);base64,#i', $base64, $m)) {
            abort(response()->json([
                'success' => false,
                'message' => 'Bad request',
                'data'    => ['error' => 'value must be a valid base64 image (png/jpg/jpeg/webp)'],
            ], 400, [], JSON_UNESCAPED_UNICODE));
        }

        $ext = strtolower($m[1]);
        $ext = $ext === 'jpeg' ? 'jpg' : $ext;

        $raw = preg_replace('#^data:image/\w+;base64,#i', '', $base64);
        $binary = base64_decode($raw, true);

        if ($binary === false) {
            abort(response()->json([
                'success' => false,
                'message' => 'Bad request',
                'data'    => ['error' => 'invalid base64 payload'],
            ], 400, [], JSON_UNESCAPED_UNICODE));
        }

        $name = Str::random(40) . '.' . $ext;

        // public_path('catalog') => /public/catalog
        $dir = public_path('catalog');
        if (!is_dir($dir)) {
            @mkdir($dir, 0775, true);
        }

        file_put_contents($dir . DIRECTORY_SEPARATOR . $name, $binary);

        return 'catalog/' . $name;
    }
}
