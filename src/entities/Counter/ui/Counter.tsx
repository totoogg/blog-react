import { Button } from '@/shared/ui/deprecated/Button/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const { add, decrement, increment } = useCounterActions();
  const counterValue = useCounterValue();

  const handleIncrement = () => {
    decrement();
  };

  const handleDecrement = () => {
    increment();
  };

  const handleAdd = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={handleIncrement} data-testid="increment-btn"></Button>
      <Button onClick={handleDecrement} data-testid="decrement-btn"></Button>
      <Button onClick={handleAdd} data-testid="add-btn"></Button>
    </div>
  );
};
