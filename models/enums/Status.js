const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
    DELETED: 'deleted',
}

module.exports = {
    ...EnumKeys,
    status: [EnumKeys.ENABLED, EnumKeys.DISABLED, EnumKeys.PENDING, EnumKeys.DELETED],

}