import { Menu, MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

interface RenderMenuSectionProps {
  items: MenuItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
  collapsed: boolean;
}
const RenderMenuSection = ({ items, selectedKey, onSelect, collapsed }: RenderMenuSectionProps) => {
  return (
    <Menu
      mode="inline"
      items={items}
      selectedKeys={[selectedKey]}
      onSelect={({ key }) => onSelect(key)}
      style={{ border: 'none' }}
      className={`*:!h-[50px] *:!leading-[50px] *:!my-0 *:!px-4 ${collapsed ? '!px-1' : '!px-6'}`}
    />
  );
};

export default RenderMenuSection;
