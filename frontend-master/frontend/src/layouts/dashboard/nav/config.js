// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Tableau de bord',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Utilisateurs',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Vehicule',
    path: '/dashboard/vehicule',
    icon: icon('285808_auto_vehicle_car_automobile_icon'),
  },
  {
    title: 'Collaborateur',
    path: '/dashboard/collaborateur',
    icon: icon('c'),
  },
  /*  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  }, */
  {
    title: 'Affectation',
    path: '/dashboard/affectation',
    icon: icon('a'),
  },
  {
    title: 'Infractions',
    path: '/dashboard/Infractions',
    icon: icon('i'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
