
interface RadioProps {
    value: string;
    name: string;
    label: string;
}
export default function Radio({ value, name, label }: RadioProps) {
    return (
        <label className="custom-radio">
            <input type="radio" name={name} value={value} />
            <span className="radiomark"></span>
            {label}
        </label>
    )
}
