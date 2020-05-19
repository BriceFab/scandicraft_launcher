export default theme => ({
    mainGrid: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    gridLeft: {
        textAlign: 'left',
    },
    gridRight: {
        textAlign: 'right',
    },
    gridCenter: {
        textAlign: 'center',
    },
    logo: {
        maxWidth: 64,
        maxHeight: 64,
        width: '100%',
    },
    banner: {
        maxWidth: 500,
        maxHeight: 100,
        borderRadius: 30,
        width: '100%',
    },
    tagChip: {
        margin: theme.spacing(1),
    },
    gridTags: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    inputIP: {
        padding: 2.5,
    },
    TextFieldIP: {
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
    }
});