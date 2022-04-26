import Button from '../../UI/Button';

const EditorButton = ({ onClick, label, className }) => {
  return (
    <Button onClick={onClick} className={className}>
      {label}
    </Button>
  );
};

export default EditorButton;
