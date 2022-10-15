import styled from "@emotion/styled";

const Container = styled.div`
  font-size: 30px;
  margin-bottom: 10px;
  div {
    border-bottom: 2px dotted #ffffff;
  }
`;

const EventDetails = () => {
  return (
    <Container>
      <div>Sábado 29 de Octubre - 22hs</div>
      <div>Secret Location</div>
      <div>DJ Set : Facu Kid & Ari Stamile</div>
    </Container>
  );
};

export default EventDetails;
