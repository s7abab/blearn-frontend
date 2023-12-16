'use client'
import ProfileInfo from '@/app/components/profile/EditProfile';
import React from 'react'
import { useSelector } from 'react-redux';

type Props = {}

const InstructorProfile = (props: Props) => {
    const { user } = useSelector((state: any) => state?.auth);
  return (
    <ProfileInfo user={user} />
  )
}

export default InstructorProfile