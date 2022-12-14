import PropTypes from 'prop-types';
import {Icon} from '@iconify/react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import {styled, useTheme} from '@material-ui/core/styles';
import {CardHeader, IconButton, Tooltip, Typography,} from '@material-ui/core';
import {useSnackbar} from 'notistack5';
import closeFill from '@iconify/icons-eva/close-fill';
import {useState} from 'react';
import {MIconButton} from "../@material-extend";
import DialogConfirm from "../_dashboard/DialogConfirm";
import {useDispatch} from "react-redux";
import {removeFromCart} from "../../redux/slices/cart";
import {checkoutProduct} from "../../redux/slices/product";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 1, 0, 3),
    height: 60
}));

// ----------------------------------------------------------------------

CheckoutListToolbar.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    setLoad: PropTypes.func,
    setSelected: PropTypes.func,
    rowCount: PropTypes.number
};
// ----------------------------------------------------------------------
export default function CheckoutListToolbar({
                                                selected,
                                                filterName,
                                                onFilterName,
                                                setLoad,
                                                setSelected,
                                                rowCount
                                            }) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    const numSelected = selected.length;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteCart = async () => {
        selected.map(e => {
            return dispatch(removeFromCart(e));
        });
        dispatch(checkoutProduct([]));
        setSelected([]);
        enqueueSnackbar('X??a th??nh c??ng!', {
            variant: 'success',
            action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Icon icon={closeFill}/>
                </MIconButton>
            ),
        });
    };
    return (
        <>
            <RootStyle
                sx={{
                    ...(numSelected > 0 && {
                        color: isLight ? 'primary.main' : 'text.primary',
                        bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography component="div" variant="subtitle1">
                        {numSelected} h??ng ???????c ch???n
                    </Typography>
                ) : (
                    <CardHeader
                        title={
                            <Typography variant="h6">
                                Gi??? h??ng
                                <Typography component="span" sx={{color: 'text.secondary'}}>
                                    &nbsp;({rowCount} s???n ph???m)
                                </Typography>
                            </Typography>
                        }
                        sx={{mb: 3}}
                    />
                )}

                {numSelected > 0 && (
                    <Tooltip title="X??a">
                        <IconButton onClick={() => handleClickOpen()}>
                            <Icon icon={trash2Fill}/>
                        </IconButton>
                    </Tooltip>
                )}
            </RootStyle>
            <DialogConfirm
                open={open}
                handleClose={handleClose}
                message={
                    <Typography color="error" variant="h4" align="center">
                        B???n ch???c ch???n mu???n x??a?
                    </Typography>
                }
                excFunc={deleteCart}
            />
        </>
    );
}
