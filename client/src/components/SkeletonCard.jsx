import React from "react";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 300,
  },
});

const totalDisplay = [1, 2, 3, 4, 5];

function SkeletonCard() {
  const classes = useStyles();
  return (
    <>
      {totalDisplay.map((skeleton, i) => {
        return (
          <div key={i} className="col-lg-2 padding-right-fix">
            <div className={classes.root}>
              <Skeleton variant="rect" width={200} height={250} />
              <Skeleton animation={false} />
              <Skeleton animation="wave" />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default SkeletonCard;
