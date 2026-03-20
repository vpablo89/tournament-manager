type Props = {
  loading: boolean;
  error: string | null;
  empty: boolean;
  emptyMessage: string;
};

export function ResourceState({ loading, error, empty, emptyMessage }: Props) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (empty) return <p>{emptyMessage}</p>;
  return null;
}
