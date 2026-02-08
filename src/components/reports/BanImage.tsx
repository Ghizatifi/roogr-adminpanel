
interface BanImageProps {
    isBan: boolean;
}

export default function BanImage({ isBan }: BanImageProps) {
    return (
        <div
            className={`${isBan ? "bg-[#FA9623]" : "bg-[#767876]"} p-1 rounded-md flex items-center justify-center`}>
            <img
                src="/subtract.png" width={20} alt="ban" role="button"/>
        </div>
    );
}
