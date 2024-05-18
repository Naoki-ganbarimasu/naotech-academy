import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material'; 


const PricingPage = () => {
  return (
    <div className="w-full max-w-3xl max-auto my-16 flex justify-around">
      
      <Card>
      <CardActionArea>
        <CardMedia/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            月額プラン
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>Month</p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default PricingPage;
