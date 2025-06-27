import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { useSelector } from 'react-redux';
import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface AddCommentFormProps {
  className?: string;
  onSendComment?: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormProps> = memo(
  ({ className, onSendComment }) => {
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value));
      },
      [dispatch],
    );

    const onSendHandler = useCallback(() => {
      onSendComment?.(text ?? '');
      onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          data-testid="AddCommentForm"
          justify="between"
          max
          className={classNames(cls.addCommentForm, {}, [className])}
        >
          <Input
            data-testid="AddCommentForm.Input"
            className={cls.input}
            placeholder={t('comment')}
            value={text}
            onChange={onCommentTextChange}
          />
          <Button
            data-testid="AddCommentForm.Button"
            onClick={onSendHandler}
            theme={ButtonTheme.OUTLINE}
          >
            {t('commentBtn')}
          </Button>
        </HStack>
      </DynamicModuleLoader>
    );
  },
);

AddCommentForm.displayName = 'AddCommentForm';

export default AddCommentForm;
