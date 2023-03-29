import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Legs from "./components/Legs";
import { addLeg } from "./redux/ducks/TodoReducer";
function App() {
  const [output, setOutput] = useState(false);

  const initialState = useSelector((state) => state.addLegSlice);
  const dispatch = useDispatch();

  const idcreater = new Date();
  var components = [
    idcreater.getYear(),
    idcreater.getMonth(),
    idcreater.getDate(),
    idcreater.getHours(),
    idcreater.getMinutes(),
    idcreater.getSeconds(),
    idcreater.getMilliseconds(),
  ];

  const payload = {
    lots: 0,
    positionType: "Buy", // or "Sell"
    optionType: "call", //or “put”
    expiryType: "weekly", //or “monthly”
    selectStrikeCriteria: "strikeType", // or “premimumRange”
    simpleMomentum: {
      type: "pointsUp",
      value: 0,
    },
    trailSL: {
      type: "points",
      value: {
        instrumentMove: 0,
        stopLossMove: 0,
      },
    },
    id: components.join(""),
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      payload,
    },
  });

  useEffect(() => {
    reset(payload);
  }, [reset, payload]);

  const onSubmit = (data) => {
    dispatch(addLeg(data));
    reset(payload);
  };

  console.log(initialState);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="flex-column">
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
          <button type="submit">Add Leg</button>

          <button type="button">Cancel</button>
        </div>
      </form>
      {initialState.map((data) => (
        <Legs data={data} key={data.id} />
      ))}

      {initialState.length ? (
        <button onClick={() => setOutput(true)} type="button">
          Final submit
        </button>
      ) : (
        ""
      )}
      {output ? <>{initialState.map((data) => (
        <div>
          <p style={{ textAlign: "left" }}>expiryType : {data.expiryType}</p>
          <p style={{ textAlign: "left" }}>lots: {data.lots}</p>
          <p style={{ textAlign: "left" }}>optionType : {data.optionType}</p>
          <p style={{ textAlign: "left" }}>
            positionType : {data.positionType}
          </p>
          <p style={{ textAlign: "left" }}>
            selectStrikeCriteria : {data.selectStrikeCriteria}
          </p>
          <p style={{ textAlign: "left" }}>
            simpleMomentum : [ type : {data.simpleMomentum.type} , value :{" "}
            {data.simpleMomentum.value}]
          </p>
          <p style={{ textAlign: "left" }}>
            trailSL : [ type : {data.trailSL.type} , value : [ instrumentMove :{" "}
            {data.trailSL.value.instrumentMove} , stopLossMove :{" "}
            {data.trailSL.value.stopLossMove}] ]
          </p>
        </div>
      ))}</> : ""}

      
    </div>
  );
}

export default App;
