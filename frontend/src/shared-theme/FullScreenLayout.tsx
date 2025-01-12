const FullScreenLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start", // Align children to the left
        alignItems: "center", // Keep children vertically centered
        height: "100vh",
        width: "100vw",
        paddingLeft: "3%",
        paddingRight: "3%",
        background:
          "linear-gradient(270deg,rgb(255, 230, 240),rgb(203, 241, 255))",
        color: "white",
      }}
    >
      {children}
    </div>
  );
};

export default FullScreenLayout;
