import PropTypes from 'prop-types';
import { useState, Fragment } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Table, TableCell, Collapse, TableHead, TableBody, TableRow,IconButton, Typography, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// utils
import { fcDate } from '../../../../utils/formatTime';
// components
import Label from '../../../../components/Label';
import { TableMoreMenu } from '../../../../components/table';

// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onChangeRow: PropTypes.func,
};

export default function InvoiceTableRow({ row, selected, onChangeRow }) {
  const theme = useTheme();

  const { reservation_id, user_id, name, phone, total_price, detail, status } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
    <TableRow hover selected={selected}>
      <TableCell align="center">
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>

      <TableCell align="center">
          <Typography variant="subtitle2" noWrap>
            {fcDate(detail[0].reservation_date)}
          </Typography>
      </TableCell>

      <TableCell align="center">{name}</TableCell>

      <TableCell align="center">{phone}</TableCell>

      <TableCell align="center">{reservation_id}</TableCell>

      <TableCell align="center">{detail.length}</TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {total_price.toLocaleString()}
      </TableCell>

      <TableCell align="right">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'R' && 'error') ||
            (status === 'U' && 'success') ||
            (status === 'D' && 'warning') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {
          (status === 'R' && '?????????') ||
          (status === 'U' && '?????????') ||
          (status === 'C' && '????????????') ||
          (status === 'D' && '????????????') ||
          (status === 'F' && '?????????')
          }
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onChangeRow('D');
                  handleCloseMenu();
                }}
                sx={{ color: 'seccess.main' }}
              >
                ?????? ??????
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onChangeRow('U');
                  handleCloseMenu();
                }}
              >
                ?????????
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onChangeRow('F');
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                ?????????
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              ?????? ??????
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>?????????</TableCell>
                  <TableCell>??????</TableCell>
                  <TableCell align="right">?????? (???)</TableCell>
                  <TableCell align="right">??? ?????? (???)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detail.map((row) => (
                  <TableRow key={row.item_id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.total_quantity}</TableCell>
                    <TableCell align="right">{row.price.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      {(row.total_quantity * row.price).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
    </>
  );
}
