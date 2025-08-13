'use client';

import { useTranslations } from 'next-intl';
import { products } from '@/services/data/products';
import Image from 'next/image';

const productsArray = products.data;

const DealsDetails = () => {
  const t = useTranslations('Dashboard');
  return (
    <div
      className="px-6 py-7 rounded-lg shadow-xs bg-card w-full overflow-x-auto space-y-2"
      style={{ scrollbarWidth: 'thin', scrollbarGutter: 'stable' }}
    >
      <h2 className="text-2xl font-bold">{t('dealsDetails')}</h2>
      <table className="w-full">
        <thead className="bg-background w-full">
          <tr>
            <th className="w-2/10 p-2 rounded-s-xl">{t('productName')}</th>
            <th className="w-2/10 p-2">{t('sku')}</th>
            <th className="w-2/10 p-2">{t('location')}</th>
            <th className="w-1/10 p-2">{t('price')}</th>
            <th className="w-1/10 p-2">{t('amount')}</th>
            <th className="w-2/10 p-2 rounded-e-xl">{t('status')}</th>
          </tr>
        </thead>
        <tbody>
          {productsArray.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="p-2 line-clamp-1 w-full flex gap-2 items-center">
                <Image
                  src={p.thumbnail}
                  width="36"
                  height="36"
                  alt={p.title}
                  title={p.title}
                ></Image>{' '}
                {p.title}
              </td>
              <td className="p-2">{p.sku}</td>
              <td className="p-2">{p.location}</td>
              <td className="p-2">{p.price}$</td>
              <td className="p-2">{p.amount}</td>
              <td className="p-2">
                {p.status === 'Delivered' ? (
                  <span className="bg-success px-2 py-1 rounded-2xl text-card">Delivered</span>
                ) : p.status === 'Out for Delivery' ? (
                  <span className="bg-warning px-2 py-1 rounded-2xl text-card">
                    Out for Delivery
                  </span>
                ) : (
                  <span className="bg-danger px-2 py-1 rounded-2xl text-card">Not Delivered</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsDetails;
