
import { useTranslation } from 'react-i18next';
import { BankType } from '../../pages/settings/BanksSetting';
import TableHeader from './TableHeader';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';

interface TablePropsProps {
    body: BankType[];
}
export default function TableProps({ body }: TablePropsProps) {
const {t}=useTranslation()
    const header: any[] = [
        `#`,
        t(`settings.accountHolder`),
        t(`settings.accountNumber`),
        t(`settings.bankIBAN`),
        t(`settings.bankLogo`),
        t(`settings.edit`),
        <RiDeleteBin6Line className="text-xl text-Input-TextRed" />
    ];
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-[20px] text-left rtl:text-right text-text-light dark:text-text-dark">
                <TableHeader header={header}/>
                <tbody>
                    {body.map((bank, index) => (
                        <tr
                            key={bank.bank_id}
                            className={`${index !== bank.length - 1 ? 'border-b' : ''}
                                dark:border-gray-700  ${index % 2 !== 0
                    ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                    : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'}`}
                        >
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px]">
                                {index+1}
                            </td>
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px] text-center">
                                {bank.bank_account_name}
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">
                                {bank.bank_account_num}</td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">{bank.bank_ipan}</td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">
                                <img src={bank.bank_img} width={100} alt="" />
                                </td>
                            <td className="px-2 py-2 font-[400] text-[17px] flex justify-center">
                            <FiEdit3 className="text-xl text-Input-TextGreen" role="button" />
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px]">
                                <RiDeleteBin6Line className="text-xl text-Input-TextRed" role='button'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
