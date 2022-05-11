type Props = {
    title: string;
};

function Header({ title }: Props) {
    return <header className='app-header'>{title}</header>;
}

export default Header;
