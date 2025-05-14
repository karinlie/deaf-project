import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
// import AlertHuman from ".../components/AlertHuman";
import AlertHuman from "../../components/AlertHuman";



const AssemblyStep = () => {
    const { stepNumber } = useParams(); // Get current step from URL
    const [stepData, setStepData] = useState(null);

    useEffect(() => {
        if (!stepNumber) {
            console.error(" stepNumber is undefined!");
            return;
        }
    
        console.log("Current stepNumber from URL:", stepNumber); // ✅ Check URL param
    
        fetch("/data/assemblySteps.json")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched JSON Data:", data); // ✅ JSON data loaded
    
                const step = data.find(s => s.id === Number(stepNumber)); // ✅ Convert to number
                console.log("Step found:", step); // ✅ Check if step is found
    
                if (step) {
                    setStepData(step);
                } else {
                    console.error("No step found for ID:", stepNumber);
                }
            })
            .catch(error => {
                console.error("Error loading JSON:", error);
            });
    }, [stepNumber]);
    
    if (!stepData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg">
            <AlertHuman />
            {/* Header Section */}
<Box sx={{ textAlign: "center", mt: 4 }}>
  <Typography variant="h3" fontWeight="bold" gutterBottom>
    Assembly Step {stepData.id}
  </Typography>

  {stepData.id <= 8 ? (
    <>
      <Typography variant="subtitle1" color="text.secondary">
        Step {stepData.id} of 8
      </Typography>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Collect pieces from bin {stepData.bin}
      </Typography>
    </>
  ) : (
    <Typography variant="h6" color="#990026" fontWeight="bold">
  🎉 Final Result
</Typography>

  )}

  <Typography variant="h5" sx={{ mt: 2 }}>
    {stepData.text}
  </Typography>
</Box>

            
            {/* Images Section */}
            <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4 , minHeight: "250px", maxHeight: "250px"}}>
                {stepData.images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ textAlign: "center" }}>
                        <img 
  src={image} 
  alt={`Step ${stepData.id} Image ${index + 1}`} 
  style={{ 
    maxWidth: "100%", 
    height: "auto", 
    maxHeight: "250px",  
    transition: "0.3s", 
    cursor: "pointer"
  }}
/>
                        </Box>
                    </Grid>
                ))}
            </Grid>

           {/* Navigation Buttons */}
           <Box   sx={{
    display: "flex",
    justifyContent: "center", // behold dette
    mx: "10%", 
    mt: 5,
  }}>
  {stepData.id > 1 ? (
    <Button
      variant="contained"
      component={Link}
      to={`/assembly-step/${stepData.id - 1}`}
      sx={{
        backgroundColor: "#CCCCCC",
        color: "black",
        padding: "8px 16px",
        fontSize: "1rem",
        borderRadius: "6px",
        fontWeight: "bold",
        "&:hover": { backgroundColor: "#AAAAAA" },
      }}
    >
      ← Previous Step
    </Button>
  ) : (
    <Box />
  )}

{stepData.id < 9 ? (
  <Button
    variant="contained"
    component={Link}
    to={`/assembly-step/${stepData.id + 1}`}
    sx={{
      backgroundColor: "#CC0033",
      color: "white",
      padding: "8px 16px",
      fontSize: "1rem",
      borderRadius: "6px",
      fontWeight: "bold",
      "&:hover": { backgroundColor: "#990026" },
    }}
  >
    Next Step →
  </Button>
) : (
    <Button
    variant="contained"
    component={Link}
    to="/assembly-step/1"
    sx={{
      backgroundColor: "#CC0033",
      color: "white",
      padding: "8px 16px",
      fontSize: "1rem",
      borderRadius: "6px",
      fontWeight: "bold",
      "&:hover": { backgroundColor: "#990026" },
    }}
  >
    🔁 Build Again
  </Button>
)}
</Box>


        </Container>
    );
};

export default AssemblyStep;


// import React, { useState, useEffect } from "react";
// import { Container, Typography, Button, Box, Grid } from "@mui/material";
// import { Link, useParams } from "react-router-dom";
// import HumanPopupAlert from "../../../components/HumanPopupAlert"; // Pass på at path er riktig!

// const AssemblyStep = () => {
//   const { stepNumber } = useParams();
//   const [stepData, setStepData] = useState(null);

//   // Popup state
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [popupSide, setPopupSide] = useState("");

//   // Get step data
//   useEffect(() => {
//     if (!stepNumber) return;

//     fetch("/data/assemblySteps.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const step = data.find((s) => s.id === Number(stepNumber));
//         setStepData(step);
//       });
//   }, [stepNumber]);

//   // Trigger popup when human is detected
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch("http://localhost:8000/detection/");
//         const data = await res.json();
//         if (data.movement_alert && data.position) {
//           setPopupSide(data.position); // "left" or "right"
//           setPopupOpen(true);
//         }
//       } catch (err) {
//         console.error("Detection error:", err);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   if (!stepData) return <Typography>Loading...</Typography>;

//   return (
//     <Container maxWidth="lg">
//       {/* Step Info */}
//       <Box sx={{ textAlign: "center", mt: 4 }}>
//         <Typography variant="h3" fontWeight="bold">
//           Assembly Step {stepData.id}
//         </Typography>

//         {stepData.id <= 8 ? (
//           <>
//             <Typography variant="subtitle1" color="text.secondary">
//               Step {stepData.id} of 8
//             </Typography>
//             <Typography variant="h4" sx={{ mt: 2 }}>
//               Collect pieces from bin {stepData.bin}
//             </Typography>
//           </>
//         ) : (
//           <Typography variant="h6" color="#990026" fontWeight="bold">
//             🎉 Final Result
//           </Typography>
//         )}

//         <Typography variant="h5" sx={{ mt: 2 }}>
//           {stepData.text}
//         </Typography>
//       </Box>

//       {/* Images */}
//       <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4, minHeight: "250px" }}>
//         {stepData.images.map((image, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Box sx={{ textAlign: "center" }}>
//               <img
//                 src={image}
//                 alt={`Step ${stepData.id} Image ${index + 1}`}
//                 style={{ maxWidth: "100%", maxHeight: "250px", height: "auto" }}
//               />
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Navigation */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
//         {stepData.id > 1 ? (
//           <Button
//             variant="contained"
//             component={Link}
//             to={`/assembly-step/${stepData.id - 1}`}
//             sx={{
//               backgroundColor: "#CCCCCC",
//               color: "black",
//               padding: "8px 16px",
//               fontSize: "1rem",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               "&:hover": { backgroundColor: "#AAAAAA" },
//             }}
//           >
//             ← Previous Step
//           </Button>
//         ) : (
//           <Box />
//         )}

//         {stepData.id < 9 ? (
//           <Button
//             variant="contained"
//             component={Link}
//             to={`/assembly-step/${stepData.id + 1}`}
//             sx={{
//               backgroundColor: "#CC0033",
//               color: "white",
//               padding: "8px 16px",
//               fontSize: "1rem",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               "&:hover": { backgroundColor: "#990026" },
//             }}
//           >
//             Next Step →
//           </Button>
//         ) : (
//           <Button
//             variant="contained"
//             component={Link}
//             to="/assembly-step/1"
//             sx={{
//               backgroundColor: "#CC0033",
//               color: "white",
//               padding: "8px 16px",
//               fontSize: "1rem",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               "&:hover": { backgroundColor: "#990026" },
//             }}
//           >
//             🔁 Build Again
//           </Button>
//         )}
//       </Box>

//       {/* 🔵 Blue Human Popup */}
//       <HumanPopupAlert open={popupOpen} side={popupSide} onClose={() => setPopupOpen(false)} />
//     </Container>
//   );
// };

// export default AssemblyStep;

