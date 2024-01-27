import { useAppSelector } from '../../hooks';
import AccountSetting from './Account/AccountSetting';
import DeleteSetting from './Delete/DeleteSetting';
import GeneralSetting from './General/GeneralSetting';

const components = {
  general: <GeneralSetting />,
  account: <AccountSetting />,
  none: <GeneralSetting />,
  delete: <DeleteSetting />,
  advance: <GeneralSetting />,
};
export default function SettingContent() {
  const { type } = useAppSelector((state) => state.setting);
  const component = components[type];
  return <div className="w-full h-full overflow-y-auto">{component}</div>;
}
