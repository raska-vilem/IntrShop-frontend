import React, {useEffect, useContext, useState, useRef} from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import TokenContext from 'contexts/TokenContext';
import SaleApi from "api/SaleApi";
import ISales from "interfaces/Sales";
import SaleItem from 'components/SaleItem/SaleItem';

const Sales: React.FC = () => {
	const [Token,] = useContext(TokenContext);
	const [sales, setSales] = useState<ISales[]>([]);
	const lastDate = useRef<number>(0);
	const salesCount = useRef<number>(0);

	useEffect(()=>{
		LoadData();
	}, []);


	const LoadData = async () => {
		const response = await SaleApi.getSales(Token);
		setSales(response.data.reverse());
		salesCount.current = sales.length;
	}

	return(
		<Container>
			<Row>
				<Col>
					<h2>
						Prodeje
					</h2>
				</Col>
			</Row>

			<Row className="justify-content-md-center">
				<Col md={7} xl={5}>
					{
						sales.map((item: ISales, key: number) => {
							if(!item.date) return(<SaleItem item={item} key={key}/>);
							const date = new Date(item.date)

							if(lastDate.current !== date.getDate()) {
								lastDate.current = date.getDate();

								return(
									<div key={key}>
										<h6 className="ml-4 mt-5"><b>{date.getDate()}. {date.getMonth()}. {date.getFullYear()}</b></h6>
										<SaleItem item={item}/>
									</div>
								);
							}

							return(
								<SaleItem item={item} key={key}/>
							);
						})
					}
				</Col>
			</Row>
		</Container>
	)
}

export default Sales;