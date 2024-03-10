import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCharacter } from "../api";

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  height: 100%;
`;

const Back = styled.div`
  margin-top: 80px;
  margin-bottom: 20px;
  color: white;
  a {
    text-decoration: none;
    color: white;
  }
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  object-fit: fill;
  border-radius: 100%;
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const FilmList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-flow: row wrap;
  align-items: center;
  width: 75%;
`;

const Film = styled.li`
  list-style: none;
  background-color: white;
  color: black;
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
  display: inline-block;
`;

const Loading = styled.div`
  text-align: center;
  color: white;
  font-size: 24px;
`;

interface Params {
  id: string;
}

interface Character {
  films: string[];
  id: number;
  imageUrl: string;
  name: string;
  sourceUrl: string;
}

export default function Detail() {
  const { id } = useParams();
  const { isLoading, data } = useQuery<Character>(["id"], () =>
    getCharacter(id)
  );
  return (
    <Container>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <Back>
            <Link to="/">&larr;</Link>
          </Back>
          <Img src={data?.imageUrl} />
          <Title>{data?.name}'s films</Title>
          <FilmList>
            {data?.films.map((film, index) => (
              <Film key={index}>{film}</Film>
            ))}
          </FilmList>
        </>
      )}
    </Container>
  );
}
