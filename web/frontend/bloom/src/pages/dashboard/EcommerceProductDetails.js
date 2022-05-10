import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// Axios
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/product-details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function EcommerceProductDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { name = '' } = useParams();
  const { product, error, checkout } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);
  
  const [itemDetail, setItemDetail] = useState([]);
  useEffect(() => {
    getItemDetail();
  }, []);

  useEffect(() => {
    console.log("itemDetail", itemDetail);
  }, [itemDetail])

  const getItemDetail = async () => {
    try {
      // 3. 로컬스토리지에서 user정보를 가져옴
      const user = localStorage.getItem('user');
      if(user != null ) {
        // 4. object인가 string인가를 JSON 형태로 사용하기 위해 파싱해줌(그래야 .access_token 이런식으로 사용 가능)
        const parseUser = JSON.parse(user);
        console.log(parseUser.access_token);
        // 5. api 호출!! 헤더에 access_token을 넣음
        const response = await axios.get("/api/item/1", {
          headers : {
            Authorization: parseUser.access_token
          }
        });
        const {data} = response.data;
        // 6. item 스테이트에 데이터 셋해줌!
        setItemDetail(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="Ecommerce: Item Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Item Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Item',
              href: PATH_DASHBOARD.eCommerce.shop,
            },
            { name: sentenceCase(name) },
          ]}
        />

        <CartWidget />

        {itemDetail && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {/* <ProductDetailsCarousel product={product} /> */}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  {/* <ProductDetailsSummary */}
                    {/* shop_number={itemDetail.shop_number} */}
                    {/* cart={checkout.cart} */}
                    {/* onAddCart={handleAddCart} */}
                    {/* onGotoStep={handleGotoStep} */}
                  {/* /> */}
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
                <Grid itemDetail xs={12} md={4} key={itemDetail.name}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {itemDetail.name}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>가격 : {itemDetail.price}원</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>남은 수량 : {itemDetail.total_quantity}개</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{itemDetail.description}</Typography>
                  </Box>
                </Grid>
            </Grid>

            <Card>
              <TabContext value={value}>
                {/* <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      label={`Review (${product.reviews.length})`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box> */}

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={itemDetail.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  {/* <ProductDetailsReview product={itemDetail} /> */}
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!itemDetail && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}