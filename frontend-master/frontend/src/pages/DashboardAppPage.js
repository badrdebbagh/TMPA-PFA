import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  /* localhost:3001/api/widget-info */
  const [widgetInfo, setWidgetInfo] = useState(null);

  useEffect(() => {
    const fetchWidgetInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/widget-info');
        setWidgetInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWidgetInfo();
  }, []);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Effectuez une requête à votre backend pour récupérer les données d'agrégation
    axios
      .get('http://localhost:3001/api/CercleGraphe')
      .then((response) => {

        const { chartData } = response.data;
        setChartData(chartData); 
        const data = response.data.chartData;

        if (Array.isArray(data)) {
          // Les données sont au format tableau
          setChartData(data);
        } else {
          console.error('Les données reçues ne sont pas au format attendu.');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données d\'agrégation :', error);
      });
  }, []);

  const [BarreGraphe , setGrapheBarre] = useState([])
  useEffect(() => {
    // Effectuez une requête à votre backend pour récupérer les données d'agrégation
    axios
      .get('http://localhost:3001/api/GrapheBarre')
      .then((response) => {

        const { BarreGraphe } = response.data;
        setGrapheBarre(BarreGraphe); 
        const data = response.data.BarreGraphe;

        if (Array.isArray(data)) {
          // Les données sont au format tableau
          setGrapheBarre(data);
        } else {
          console.error('Les données reçues ne sont pas au format attendu.');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données d\'agrégation :', error);
      });
  }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Utilistateurs" total={widgetInfo?.nombreTotalUtilisateurs || '0'} icon={'ant-design:team-outlined'} /> 
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary 
            title="Nouveau Utilisateur" 
            total={widgetInfo?.nombreNouveauxUtilisateurs || '0'} 
            color="info" 
            icon={'ant-design:usergroup-add-outlined'} /> 
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Véhicules" total={widgetInfo?.nombreTotalVehicules  || '0'} color="warning" icon={'ant-design:car-filled'} /> 
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Collaborateurs" total={widgetInfo?.nombreTotalCollaborateurs  || '0'} color="error" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Visites de Sites Web"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                /* '12/01/2023', */
              ]}
              chartData={[
                {
                  name: 'Administrateur',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Utilisateurs',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Administrateur et Utilisateur',
                  type: 'line',
                  fill: 'solid',
                  data: [67, 66, 63, 94, 35, 65, 58, 62, 100, 49, 73],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Véhicules Existe"
              chartData={chartData}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Collaborateurs"
              subheader="(+43%) Que l'an dernier"
              chartData={BarreGraphe}
              /* [
                { label: 'TMSA', value: 40 },
                { label: 'TMPA', value: 22 },
                { label: 'TME', value: 33 },
                { label: 'CIRES', value: 27 },
                { label: 'MEDHUB', value: 50 },
                { label: 'CTHFZ', value: 30 },
                { label: 'TFZ', value: 70 },
                { label: 'FTM', value: 21 },
                { label: 'TMU', value: 15 },
                { label: 'TM2', value: 33 },
              ] */
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Graphe des Véhicules"
              chartLabels={['TMSA', 'TMPA', 'CIRES', 'TME', 'MEDHUB', 'TFZ']}  //filliale
              chartData={[
                { name: 'DACIA', data: [80, 50, 30, 40, 100, 20] },
                { name: 'MERCEDESS', data: [20, 30, 40, 80, 20, 80] },
                { name: 'AUDI', data: [44, 76, 78, 13, 43, 10] },
                { name: 'BMW', data: [22, 46, 18, 53, 23, 40] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
  
         <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Actualité : Ajout , Modification , Supprision , Affectation "
              list={[...Array(4)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Ajout d un Collaborateur Alami Mohamed ',
                  'Alami Mohamed : Modification de la Data de Validité CIN ',
                  'Supprission d un Collaborateur Salhi Anass ',
                  'Dacia D128H :  Modification des de la Puissance fiscale de 45 vers 65 ',
                ][index],
                type: `order${index + 1}`,
                /* description: faker.name.jobTitle(), */
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(), 
              }))} 
            />
          </Grid> 

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Location des Véhicules"
              list={[...Array(4)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Mercedes,  véhicules importés : 23 , 19500Dh/mois ',
                  'Audi,  véhicules importés : 21 ,  18000Dh/mois ',
                  'BMW,  véhicules importés : 25 , 15000Dh/mois ',
                  'Dacia,  véhicules importés : 223 , 7500Dh/mois ',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
