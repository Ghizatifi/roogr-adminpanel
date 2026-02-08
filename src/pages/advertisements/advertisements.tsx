import React from 'react';
import useAllAds from '../../hooks/useAllAds';
import MainTable from '../../components/lastnews/MainTable';
const NotBannedIconSrc = './../../../public/unblock.svg';
const EditIconSrc = './../../../public/Edit.svg';

const Ads: React.FC = () => {
  const { ads, loading, error } = useAllAds();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Transform the ads data to fit the format that MainTable expects
  const logs = ads.map((ad) => {
    const createdAtDate = new Date(ad.created_at);
    const datePart = createdAtDate.toLocaleDateString(); // Extract the date part
    const timePart = createdAtDate.toLocaleTimeString(); // Extract the time part

    return {
      id: ad.ad_id, // Use the correct field from your API response
      type: 2, // Assuming 2 is the type for ads (you can change it if needed)
      columns: [
        { key: 'name', content: ad.name, className: 'name-class' },
        // { key: 'url', content: ad.url, className: 'url-class' },
        {
          key: 'period',
          content: `${ad.period} days`,
          className: 'period-class',
        },
        { key: 'created_at_date', content: datePart, className: 'date-class' }, // For date
        { key: 'created_at_time', content: timePart, className: 'time-class' }, // For time
        { key: 'name', content: ad.name, className: 'name-class' },
        { key: 'name', content: ad.name, className: 'name-class' },

        {
          key: 'image',
          content: (
            <img
              src={ad.image}
              alt={ad.name}
              className="w-10 h-10 object-cover"
            />
          ),
          className: 'image-class',
        },
        {
          key: 'Edit',
          content: (
            <div className="bg-EditIconBg rounded-md">
              <img
                src={EditIconSrc}
                //   alt={user.isBanned ? 'Banned' : 'Not Banned'}
                className="w-6 h-6 text-center m-1 " // Set appropriate size
                //   onClick={() => handleBanClick(user.id)} /
              />
            </div>
          ),
          className: 'flex justify-center',
        },

        {
          key: 'isBanned',
          content: (
            <img
              //   src={user.isBanned ? BannedIconSrc : NotBannedIconSrc}
              src={NotBannedIconSrc}
              //   alt={user.isBanned ? 'Banned' : 'Not Banned'}
              className="w-6 h-6 text-center" // Set appropriate size
              //   onClick={() => handleBanClick(user.id)} /
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });
  const headers = [
    { key: 'id', content: 'رقم الاعلان', className: 'text-' },
    { key: 'name', content: 'أسم المعلن', className: 'text-' },
    { key: 'alias', content: 'التاريخ', className: 'text-' },
    { key: 'type', content: 'الوقت', className: 'text-' },
    { key: 'regDate', content: 'القسم', className: 'text-' },
    {
      key: 'mobileconfirm',
      content: 'أسم الاعلان',
      className: 'text-center',
    },
    {
      key: 'emailleconfirm',
      content: 'الصورة',
      className: 'text-center',
    },
    {
      key: 'emailleconfirm',
      content: 'تحرير',
      className: 'text-center',
    },
    { key: 'BanStatus', content: 'الحالة', className: 'text-center' },
  ];
  return <MainTable logs={logs} headers={headers} />;
};

export default Ads;
