export const getUniqname = (user) => {
    return user.email.split("@")[0]
}

