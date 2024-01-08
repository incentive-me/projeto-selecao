export const layoutStyle = {
    header: {
        container: {
            bgcolor: "#424242",
            paddingTop: "11px",
            paddingBottom: "11px",
            paddingLeft: "16px",
            paddingRight: "16px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }, 
        account: {
            backgroundColor: "#BDBDBD",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100px"
        },
        logo : {
            color: "#fff",
            fontFamily: "Alata",
            fontWeight: "400",
            fontSize: "34px"
        },
        icon: {
            color: "#fff",
            
        }
    },
    body : {
        display: "flex",
        height: "calc(100vh - 73px)"
    }, 
    menu : {
        container: {
          background: "linear-gradient(180deg, #ffffff26 0%, #ffffff26 100%), #121212",
          boxShadow: "0px 6px 30px 5px #0000001f, 0px 16px 24px 2px #00000024, 0px 8px 10px -5px #00000033",
          width: "320px",
          heigth: "400px"
        },
        buttonBox: {
            display: "flex",
            justifyContent: "start",
            paddingLeft: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
            borderRadius: "0px",
            height: "48px",
            width: "320px",
            ":hover": {
                backgroundColor: "#90caf915"
            }
        },
        icon: {
            color: "#ffffff8f",
            marginRight: "32px"
        }
    },
    pageContent: {
        width: "100%",
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "24px"
    }
}