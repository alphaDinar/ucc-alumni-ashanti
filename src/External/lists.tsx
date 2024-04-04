import logoAsset from '../../public/logo.webp';
import { FaBuildingColumns } from 'react-icons/fa6';
import { MdOutlineGroups2 } from 'react-icons/md';
import { FaHandsHelping } from 'react-icons/fa';

export const logo = logoAsset;

export const goalList = [
  { tag: 'Develop', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis qu', iconEl: <FaBuildingColumns /> },
  { tag: 'Connect', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis qu', iconEl: <MdOutlineGroups2 /> },
  { tag: 'Support', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis qu', iconEl: <FaHandsHelping /> }
]

export const paymentMethodList = [
  { tag: 'Paystack', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707772904/Agrivestafrica/paystack_elrs9j.png' },
  { tag: 'MTN', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773080/Agrivestafrica/mtn_tlljga.png' },
  { tag: 'Vodafone', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773155/Agrivestafrica/voda-removebg-preview_1_c8njum.png' },
  { tag: 'AirtelTigo', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773220/Agrivestafrica/airtel-removebg-preview_1_possew.png' },
  { tag: 'Visa', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773591/Agrivestafrica/visa-removebg-preview_1_gvzm2h.png' },
  { tag: 'Master', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773592/Agrivestafrica/master_mhgszl.webp' }
]

export const countryList = [
  { country: 'Ghana', countryCode: 'GH', phoneCode: '233' },
  { country: 'Benin', countryCode: 'BJ', phoneCode: '229' },
  { country: 'Burkina Faso', countryCode: 'BF', phoneCode: '226' },
  { country: 'Cape Verde', countryCode: 'CV', phoneCode: '238' },
  { country: 'Côte d\'Ivoire', countryCode: 'CI', phoneCode: '225' },
  { country: 'Gambia', countryCode: 'GM', phoneCode: '220' },
  { country: 'Guinea', countryCode: 'GN', phoneCode: '224' },
  { country: 'Guinea-Bissau', countryCode: 'GW', phoneCode: '245' },
  { country: 'Liberia', countryCode: 'LR', phoneCode: '231' },
  { country: 'Mali', countryCode: 'ML', phoneCode: '223' },
  { country: 'Mauritania', countryCode: 'MR', phoneCode: '222' },
  { country: 'Niger', countryCode: 'NE', phoneCode: '227' },
  { country: 'Nigeria', countryCode: 'NG', phoneCode: '234' },
  { country: 'Senegal', countryCode: 'SN', phoneCode: '221' },
  { country: 'Sierra Leone', countryCode: 'SL', phoneCode: '232' },
  { country: 'Togo', countryCode: 'TG', phoneCode: '228' }
];