import { Backdrop, CircularProgress } from "@mui/material";

const BackDrop = (props: { loading: boolean }) => {
  const { loading } = props;

    console.log("entrei")

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default BackDrop;
