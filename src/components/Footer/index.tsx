export const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#000", color: "#fff", padding: "2em 0" }}>
            <div className='container' style={{ textAlign: "center" }}>
                <p>
                    This site was built by{" "}
                    <a href='https://github.com/Lombardoc4' target='_blank'>
                        Cris Lombardo
                    </a>{" "}
                    -{" "}
                    <a href='https://github.com/Lombardoc4/np-explorer' target='_blank'>
                        View Code
                    </a>{" "}
                </p>
                <p>
                    Special thanks to{" "}
                    <a href='https://nps.gov' target='_blank'>
                        National Parks Service
                    </a>
                    {" "}
                    <a href='https://www.weather.gov/' target='_blank'>
                        National Weather Service
                    </a>
                    {/* <a href="https://github.com/erikflowers" target="_blank">Eric Flowers</a> */}
                </p>
            </div>
        </footer>
    );
};
