import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCharacters } from "../api";

const Container = styled.div`
  margin: 0 auto;
  background-color: black;
`;

const Header = styled.div`
  font-size: 36px;
  color: white;
  text-align: center;
  padding: 40px;
`;
const Characters = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
`;
const Character = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  a {
    text-decoration: none;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 10px;
    &:hover {
      background-color: white;
      color: black;
      transition: 0.3s ease-in;
    }
  }
`;
const Img = styled.img`
  width: 150px;
  height: 150px;
  object-fit: fill;
  border-radius: 100%;
  padding-bottom: 10px;
`;
const Loading = styled.div`
  text-align: center;
  color: white;
  font-size: 24px;
`;

interface Character {
  id: number;
  imageUrl: string;
  name: string;
}

export default function Home() {
  const { isLoading, data } = useQuery<Character[]>(
    ["characters"],
    getCharacters
  );
  return (
    <Container>
      <Header>Disney Characters</Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Characters>
          {data?.slice(0, 100).map((character) => {
            return (
              <Character key={character.id}>
                <Link to={`/character/${character.id}`}>
                  {" "}
                  <Img src={character.imageUrl} />
                  {character.name}
                </Link>
              </Character>
            );
          })}
        </Characters>
      )}
    </Container>
  );
}
