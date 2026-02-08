import { useSelector } from "react-redux";
import { selectLanguage } from "../../store/slices/language";
import { Field } from "formik";

interface CheckboxProps {
    value: string;
    name: string;
    label: string;
    checked:boolean;
    change:any
}
export default function Checkbox({ value, name, label, change, checked }: CheckboxProps) {
    const language = useSelector(selectLanguage);
    return (
        <label className={`custom-checkbox `}>
            <Field type="checkbox" name={name} value={value} onChange={change} checked={checked}/>
            <span className="checkmark"></span>
            <span className={`${language=='ar'?'ms-2':'me-2'} ${language=='ar'?'me-5':'ms-5'}`}>{label}</span>
        </label>
    )
}