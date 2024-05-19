import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material'; 
import annual from "./annual.png"
import month from "./month.png"

const PricingPage = () => {
  return (
    <div className="w-full max-w-3xl max-auto my-16 flex justify-around">
      
      <Card>
      <CardActionArea>
          <CardMedia
            component="img"
            height="40"
            image="/month.jpg" // Correct path from the root directory
            alt="month price"
            className=''
          />
          <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            月額プラン
          </Typography>
          <Typography gutterBottom  component="div">
            Month
          </Typography>
          <Typography variant="h5" color="text.secondary">
            2500/月
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          サブスクリプション契約をする
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default PricingPage;
