import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';
import Logo from "../../../components/Logo";

// ----------------------------------------------------------------------

Font.register({
    family: 'Roboto',
    fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }]
});

const styles = StyleSheet.create({
    col4: { width: '25%' },
    col8: { width: '75%' },
    col6: { width: '50%' },
    mb8: { marginBottom: 10 },
    mb40: { marginBottom: 40 },
    pass: {textAlign: 'center', fontSize: '30px', marginTop: '40px'},
    trao: {textAlign: 'center', fontSize: '10px', marginTop: '10px'},
    overline: {
        fontSize: 8,
        marginBottom: 8,
        letterSpacing: 1.2,
        textTransform: 'uppercase'
    },
    h1: { fontSize: 36, fontWeight: 700, textAlign: 'center' },
    h2: { fontSize: 16, textAlign: 'center' },
    h3: { fontSize: 16, fontWeight: 700 },
    title: {marginTop: "10px", color: "#2596be"},
    wrapKhoaHoc: {marginTop: "60px"},
    h4: { fontSize: 13, fontWeight: 700 },
    body1: { fontSize: 10 },
    subtitle2: { fontSize: 9, fontWeight: 700 },
    alignRight: { textAlign: 'right' },
    page: {
        padding: '40px 24px 0 24px',
        fontSize: 9,
        lineHeight: 1.6,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        textTransform: 'capitalize'
    },
    footer: {
        left: 0,
        right: 0,
        bottom: 0,
        padding: 24,
        margin: 'auto',
        borderTopWidth: 1,
        borderStyle: 'solid',
        position: 'absolute',
        borderColor: '#DFE3E8'
    },
    footer1: {marginTop: "20px"},
    gridContainer: { flexDirection: 'row'},
    table: { display: 'flex', width: 'auto' },
    tableHeader: {},
    tableBody: {},
    tableRow: {
        padding: '8px 0',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DFE3E8'
    },
    noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
    tableCell_1: { width: '5%' },
    tableCell_2: { width: '50%', paddingRight: 16 },
    tableCell_3: { width: '15%' }
});


// ----------------------------------------------------------------------

export default function InvoicePDF({diem, baithi, userName}) {

    let ngay = new Date();
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.gridContainer]}>
                    <Image source="/static/brand/code-optimization.png" style={{ height: 32, marginRight: "10px" }} />
                    <Text style={[styles.h3, styles.title]}>LearnCode</Text>
                </View>

                <View style={{ alignItems: 'right', flexDirection: 'column' }}>
                    <Text style={[styles.overline, styles.mb8 , styles.pass]}>Chứng chỉ hoàn thành</Text>
                </View>
                <View style={{ alignItems: 'right', flexDirection: 'column' }}>
                    <Text style={[styles.overline,styles.trao]}>Được trao cho</Text>
                </View>
                <View>
                    <Text style={styles.h1}>{userName}</Text>
                </View>
                <View style={{ alignItems: 'right', flexDirection: 'column' }}>

                    <Text style={[styles.overline, styles.h2]}>Xác nhận hoàn thành khóa học {baithi.baikiemtra.kh_ten}</Text>
                </View>

                <View style={[styles.gridContainer, styles.footer1]}>
                    <View style={styles.col8}>
                        <Text style={styles.subtitle2}>Điểm: {diem} </Text>
                        <Text style={styles.subtitle2}>Ngày thi: {ngay.getDate()}/{ngay.getMonth()}/{ngay.getFullYear()}</Text>
                    </View>
                </View>
            </Page>
        </Document>

    );
}
