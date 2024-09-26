'use client'


// ** MUI
import { ButtonBase, Typography } from "@mui/material"

// ** Icons
import { IconType } from "react-icons"


interface ButtonProps {
    label: string;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    custom?: string;
    icon?: IconType;
    backgroundColor?: string;
    borderColor?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
};


const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    outline,
    small,
    custom,
    backgroundColor,
    borderColor,
    icon: Icon,
    onClick
}) => {
    return (
        <ButtonBase
            type="button"
            disabled={disabled}
            sx={{
                opacity: disabled ? '0.7' : '1',
                cursor: disabled ? 'not-allowed' : 'pointer',
                borderRadius: '0.37rem',
                transition: 'all 0.2s ease-in-out',
                width: '100%',
                border: '1px solid',
                borderColor: borderColor ? borderColor : '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: backgroundColor ? backgroundColor : outline ? '#fff' : '#334155',
                '&:hover': {
                    opacity: '0.8'
                }
            }}
            onClick={onClick}
        >
            {Icon && <Icon size={24} />}
            <Typography
                sx={{
                    color: outline ? '#334155' : '#fff',
                    fontSize: small ? '0.875rem' : '0.97rem',
                    fontWeight: 900,
                    py: small ? '0.25rem' : '0.75rem',
                    px: small ? '0.5rem' : '1rem',
                }}
            >
                {label}
            </Typography>
        </ButtonBase>
    )
}

export default Button