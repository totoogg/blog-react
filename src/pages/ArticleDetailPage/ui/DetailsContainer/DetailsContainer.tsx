import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer: FC<DetailsContainerProps> = memo(
  ({ className }) => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
      return null;
    }

    return (
      <Card max className={className} padding="24" border="round">
        <ArticleDetails id={id} />
      </Card>
    );
  },
);

DetailsContainer.displayName = 'DetailsContainer';
