import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addLeg, deleteLeg } from "../redux/ducks/TodoReducer";

export default function Legs({ data: payload }) {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      payload,
    },
  });

  useEffect(() => {
    reset(payload);
  }, [reset]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addLeg(data));
  };

  const onDelete = () => {
    dispatch(deleteLeg(payload.id));
  };

  console.log(payload.simpleMomentum.type || payload.simpleMomentum.value);
  return (
    <div className="card relative">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-column ">
        <div className="flex-row">
          <label>
            <p>Total Lot</p>
            <input type="number" name="lots" {...register("lots")} />
          </label>
          <label>
            <p>Position</p>
            <select
              name="positionType"
              {...register("positionType")}
              className="select"
            >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </label>
          <label>
            <p>Option Type</p>
            <select
              name="optionType"
              {...register("optionType")}
              className="select"
            >
              <option value="call">call</option>
              <option value="put">put</option>
            </select>
          </label>
          <label>
            <p>Expiry</p>
            <select
              name="expiryType"
              {...register("expiryType")}
              className="select"
            >
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>
          </label>
          <label>
            <p>Select Strike Criteria</p>
            <select
              name="selectStrikeCriteria"
              {...register("selectStrikeCriteria")}
              className="select"
            >
              <option value="strikeType">strikeType</option>
              <option value="premimumRange">premimumRange</option>
            </select>
          </label>
        </div>

        <div className="flex-row">
          <div className="flex-column gap-1">
            <div className="flex-row gap-1">
              <input
                type="checkbox"
                name="simpleMomentum"
                {...register("simpleMomentum")}
                // defaultChecked={(payload.simpleMomentum.type || payload.simpleMomentum.value) ? true : false}
              />
              <p>Simple Momentum</p>
            </div>
            <div className="flex-row gap-1">
              <select
                name={`simpleMomentum.type`}
                {...register(`simpleMomentum.type`)}
                className="select"
                disabled={watch("simpleMomentum") ? false : true}
              >
                <option value="pointsUp">pointsUp</option>
                <option value="pointsDown">pointsDown</option>
              </select>
              <input
                className="width-50"
                type="number"
                name={`simpleMomentum.value`}
                {...register(`simpleMomentum.value`)}
                disabled={watch("simpleMomentum") ? false : true}
              />
            </div>
          </div>
          {/*  */}
          <div className="flex-column gap-1">
            <div className="flex-row gap-1">
              <input type="checkbox" name="trailSL" {...register("trailSL")} />
              <p>Trail SL</p>
            </div>
            <div className="flex-row gap-1">
              <select
                name={`trailSL.type`}
                {...register(`trailSL.type`)}
                className="select"
                disabled={watch("trailSL") ? false : true}
              >
                <option value="points">points</option>
                <option value="percentage">percentage</option>
              </select>
              <input
                className="width-50"
                type="number"
                disabled={watch("trailSL") ? false : true}
                name={`trailSL.value.instrumentMove`}
                {...register(`trailSL.value.instrumentMove`)}
              />
              <input
                className="width-50"
                type="number"
                disabled={watch("trailSL") ? false : true}
                name={`trailSL.value.stopLossMove`}
                {...register(`trailSL.value.stopLossMove`)}
              />
            </div>
          </div>
        </div>
        <div className="flex-column gap-1 absolute">
          <button
            type="submit"
            className="fa fa-copy"
            onClick={handleSubmit(onSubmit)}
          ></button>
          <button type="button" className="material-icons" onClick={onDelete}>
            delete
          </button>
        </div>
      </form>
    </div>
  );
}
