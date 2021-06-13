import moment from 'moment';
import  'moment-timezone';
import 'moment/locale/es.js';

moment.locale('es');
moment.tz.setDefault("America/Mexico_City");


export const formatDateTime = (value) => {
  if (!value) return '';
	return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
};
export const nowDate = () => moment().format('MMMM Do YYYY, h:mm:ss a');
export const formatYYYYMMDD = (value) => {
  if (!value) return '';
	return moment(String(value),'DD/MM/YYYY').format('YYYY-MM-DD')
};


export const hourMonth = ( value ) => {
  if (!value) return '';
  return moment(value).format('HH:mm a | MMMM Do');

}