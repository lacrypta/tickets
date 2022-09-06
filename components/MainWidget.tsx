import styled from "@emotion/styled";
import { Button, Divider, List, ListItem, Paper } from "@mui/material";

const Container = styled(Paper)`
  padding: 5em;
`;

export const MainWidget = () => {
  return (
    <Container elevation={8}>
      <div></div>

      <div></div>

      <List component='nav'>
        <ListItem>Dirección: address</ListItem>
        <ListItem>Cantidad: Monto</ListItem>
        <Divider />
        <ListItem>
          <Button variant='contained'>Approve Ilimitado</Button>
        </ListItem>
        <ListItem>
          <Button variant='contained'>Pagar</Button>
        </ListItem>
      </List>
    </Container>
  );
};
