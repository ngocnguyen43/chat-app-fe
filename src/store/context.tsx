import React from "react"

type AuthStageInitialState = {
    stage: 0 | 1 | 2 | 3
    setStage: (number: 1 | 2 | 3) => void
}
export const AuthStageContext = React.createContext({} as AuthStageInitialState)

export const AuthStageProvider = ({ children }: React.PropsWithChildren) => {
    const [stage, setStage] = React.useState<0 | 1 | 2 | 3>(0)
    const value = {
        stage,
        setStage
    }
    return <AuthStageContext.Provider value={value}>
        {children}
    </AuthStageContext.Provider>
}
type UserInitialState = {
    user: string | null
    setUser: (email: string) => void
}
export const UserContext = React.createContext({} as UserInitialState)
export const UserProvider = ({ children }: React.PropsWithChildren) => {
    const [user, setUser] = React.useState<string | null>(null)
    const value = {
        user,
        setUser
    }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}