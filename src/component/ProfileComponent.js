import React from 'react';
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import {Profile} from "./Profile";

export function ProfileComponent() {
    return (
        <>
            <PrimarySearchAppBar/>
                <Profile />
            </>
    );
};