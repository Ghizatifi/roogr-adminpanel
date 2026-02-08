import { useSelector } from "react-redux";
import Checkbox from "../../components/form/Checkbox";
import { useTranslation } from "react-i18next";
import { selectLanguage } from "../../store/slices/language";
import { CheckboxItem } from "./AddAdmin";

interface CheckboxItemProps {
    checks: CheckboxItem[];
    setChecks: (checks: CheckboxItem[]) => void;
    setFieldValue: (field: string, value: any) => void;
    label: string;
}
const CheckboxGroup = ({ checks, setChecks, setFieldValue, label }: CheckboxItemProps) => {
    const language = useSelector(selectLanguage);
    const { t } = useTranslation();
    const handleMainCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const updatedChecks = checks.map(item => ({ ...item, isChecked: checked }));
        setChecks(updatedChecks);
        updatedChecks.forEach(item => setFieldValue(item.name, item.isChecked));
    };
    const handleCheckboxChange = (index: number) => {
        const newChecks = [...checks];
        newChecks[index].isChecked = !newChecks[index].isChecked;
        setChecks(newChecks);
        setFieldValue(newChecks[index].name, newChecks[index].isChecked);
    };
    const allChecked = checks.every(item => item.isChecked);
    return (
        <div>
            <div className="md:mb-1 md:mt-0 mt-4 font-semibold text-lg">
                <Checkbox value={``} name={`selectAll`} label={label} checked={allChecked}
                    change={handleMainCheckboxChange} />
            </div>
            <div>
                {checks.map((item, index) => (
                    <label className={`custom-checkbox`} key={index}>
                        <input
                            type="checkbox"
                            name={item.name}
                            value={item.isChecked ? '1' : '0'}
                            onChange={() => handleCheckboxChange(index)}
                            checked={item.isChecked}
                        />
                        <span className="checkmark"></span>
                        <span className={`${language === 'ar' ? 'ms-2' : 'me-2'} ${language === 'ar' ? 'me-5' : 'ms-5'}`}>
                            {t(item.label)}
                        </span>
                    </label>

                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;
