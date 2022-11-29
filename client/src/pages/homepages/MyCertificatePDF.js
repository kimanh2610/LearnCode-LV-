import { v4 as uuidv4 } from 'uuid';
import { random, sum } from 'lodash';
// material
import { styled } from '@material-ui/core/styles';
import {
    Box,
    Grid,
    Card,
    TableRow,
    Container,
    Typography,
    TableContainer
} from '@material-ui/core';
// routes

import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Logo from "../../components/Logo";
import MyInvoiceToolbar from "./MyCertificate/MyInvoiceToolbar";
import {formatDateTime} from "../../_helper/formatDate";


// ----------------------------------------------------------------------


const RowResultStyle = styled(TableRow)(({ theme }) => ({
    '& td': {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
}));

// ----------------------------------------------------------------------

export default function MyCertificatePDF({chungchi, userName}) {


    const { themeStretch } = useSettings();
    return (
        <Page title="Chứng chỉ của tôi" style={{marginTop: "20px"}}>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Chứng chỉ khóa học"
                    links={[
                        { name: 'Trang chủ', href: '/' },
                        { name: 'Chứng chỉ' }
                    ]}
                />

                <MyInvoiceToolbar chungchi={chungchi} userName={userName} />

                <Card sx={{ pt: 5, px: 5 }}>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ mb: 4, width: '300px'}}>
                            <div style={{display: "flex"}}>
                                <Logo />
                                <Typography variant="h4" sx={{ ml: 2, mt:1, color: 'text.primary'}}>
                                    LearnCode
                                </Typography>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                            <Box sx={{ textAlign: { sm: 'right' } }}>
                                <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                                    Đã hoàn thành chứng chỉ {chungchi.kh_ten}
                                </Label>
                                <Typography variant="h6"></Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} md={12} sx={{ py: 3 }}>
                            <Typography sx={{textTransform: 'uppercase', mb: 1 , textAlign: 'center', fontSize: "40px"  }}>Chứng chỉ hoàn thành</Typography>
                            <Typography sx={{textTransform: 'uppercase', mb: 1 , textAlign: 'center', fontSize: "20px" }}>Được trao cho</Typography>
                            <Typography  sx={{textTransform: 'uppercase', mb: 1 , textAlign: 'center', fontSize: "60px", fontWeight: "bold"}}>{userName}</Typography>
                            <Typography sx={{textTransform: 'uppercase', mb: 1 , textAlign: 'center', fontSize: "30px" }}>
                                Xác nhận hoàn thành khóa học {chungchi.kh_ten}
                            </Typography>
                        </Grid>
                    </Grid>


                    <Grid item xs={12} md={9} sx={{ py: 3 }}>
                        <Typography variant="body2">Điểm: {chungchi.cc_diem}</Typography>
                        <Typography variant="body2">
                            Ngày : {formatDateTime(chungchi.kh_create_at)}
                        </Typography>
                    </Grid>

                </Card>
            </Container>
        </Page>
    );
}
