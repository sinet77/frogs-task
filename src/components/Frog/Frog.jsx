import clsx from "clsx";
import {
  blue_frog,
  red_frog,
  selected_blue_frog,
  selected_red_frog,
} from "../../assets/AppImages";

export default function Frog({ frog, isSelected }) {
  const { gender } = frog;

  let frogImage;
  if (isSelected) {
    frogImage = gender === "male" ? selected_blue_frog : selected_red_frog;
  } else {
    frogImage = gender === "male" ? blue_frog : red_frog;
  }

  const className = clsx("frog", gender, { "selected-frog": isSelected });

  return (
    <div className={className}>
      <img src={frogImage} alt={`${gender} frog`} />
    </div>
  );
}
