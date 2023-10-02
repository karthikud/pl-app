import { Card, CardContent, Typography } from "@mui/material";
import  { ContractProps } from "../interfaces";
// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export default function Contract({ id, category, salesRep, value, name }: ContractProps) {
  const cardColor = getRandomColor();

  return (
    <div style={{ alignContent: "centre", margin: "5%", maxWidth: "200px" }}>
      <Card style={{ backgroundColor: cardColor }} sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography variant="h5" component="div">
             {id}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {name}
          </Typography>
          <Typography variant="body2">
            {category}
            <br />
            by:{salesRep}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}