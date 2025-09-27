import { useState, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'

// --- Tus colores, sombras y animaciones del JSON ---
const colors = {
  gradientStart: '#a78bfa',
  gradientMid: '#f472b6',
  gradientEnd: '#facc15',
  textPrimary: '#ffffff',
  textSecondary: '#fef3c7',
  linkHover: '#f9a8d4'
}

const shadows = {
  card: '0 12px 24px rgba(250, 204, 21, 0.2), 0 20px 40px rgba(244, 114, 182, 0.2)',
  cardHover: '0 18px 36px rgba(244, 114, 182, 0.4), 0 30px 60px rgba(167, 139, 250, 0.3)'
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
`

// --- Styled Components ---
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 36rem; /* igual a max-w-xl */
  margin-left: auto;
  margin-right: auto;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1.25rem 0.75rem 3.5rem; /* padding-left para icono */
  border-radius: 1.25rem; /* rounded-xl */
  border: 1px solid #d1d5db; /* gray-300 */
  background: linear-gradient(
    90deg,
    ${colors.gradientStart},
    ${colors.gradientMid},
    ${colors.gradientEnd}
  );
  color: ${colors.textPrimary};
  font-weight: 600;
  font-size: 1.125rem; /* text-lg */
  box-shadow: ${shadows.card};
  outline: none;
  animation: ${fadeInUp} 0.7s ease forwards;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &::placeholder {
    color: ${colors.textSecondary};
    opacity: 0.9;
  }

  &:hover {
    box-shadow: ${shadows.cardHover};
  }

  &:focus {
    border-color: ${colors.gradientMid};
    box-shadow: 0 0 0 4px rgba(244, 114, 182, 0.4);
  }
`

const Icon = styled.svg`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.textSecondary};
  pointer-events: none;
  transition: color 0.3s ease;

  ${Input}:focus + & {
    color: ${colors.linkHover};
  }
`

// --- Hook de debounce ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// --- Componente principal ---
export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const memoizedOnSearch = useCallback(() => {
    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  useEffect(() => {
    memoizedOnSearch()
  }, [memoizedOnSearch])

  return (
    <Container>
      <Input
        type="search"
        role="searchbox"
        aria-label="Buscar usuarios"
        placeholder="Buscar por nombre, perfil o intereses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Icon
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width={22}
        height={22}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-5-5m2-4a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </Icon>
    </Container>
  )
}
