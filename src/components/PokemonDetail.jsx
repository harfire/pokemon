import React from 'react';

export default function PokemonDetail(props) {
	let images = [];
	if (props && props.detail && props.detail.sprites) {
		images = Object.values(props.detail.sprites).filter((val) => typeof val === 'string' && val);
	}

	return (
		<div className="columns is-multiline is-variable is-6 detail-content">
			{!props.detail ? (
				<div className="column is-full is-size-5">Pick your Pokemon!</div>
			) : (
				<>
					<div className="column is-half">
						<div id="slideshow" className="card">
							<ul>
								{images && images.length
									? images.map((val, i) => (
											<li key={`image-${i}`}>
												<a id={`slider-${i}`} href={`#slider-display-${i}`}>
													&#x25C9;
												</a>
												<p id={`slider-display-${i}`}>
													<img src={val} alt={`slider-${i}`} />
												</p>
											</li>
									  ))
									: undefined}
							</ul>
						</div>
						<div className="is-clearfix m-t-50">&nbsp;</div>
						<div className="columns is-gapless is-multiline m-b-5">
							<div className="column is-full">
								<h3 className="has-text-weight-bold is-size-5 has-text-primary">Moves</h3>
							</div>
						</div>
						<div className="columns is-gapless is-multiline moves-cont">
							<div className="column is-full">
								<div className="columns is-gapless is-multiline">
									{props.detail.moves.map((val, i) => (
										<div key={`item-move-${i}`} className="column is-half moves">
											<div className="item-moves">{val.move.name}</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className="column is-half">
						<div className="columns is-multiline is-gapless m-b-8">
							<div className="column is-full">
								<h3 className="has-text-weight-bold is-size-5 has-text-primary">Profile</h3>
							</div>

							<div className="column is-two-fifths has-text-weight-bold is-size-7">Name</div>
							<div className="column is-half is-size-6 has-text-weight-bold is-capitalized">{props.detail.name}</div>

							<div className="column is-two-fifths has-text-weight-bold is-size-7">Height</div>
							<div className="column is-half is-size-7">{props.detail.height} ft</div>

							<div className="column is-two-fifths has-text-weight-bold is-size-7">Weight</div>
							<div className="column is-half is-size-7">{props.detail.weight} kg</div>

							<div className="column is-two-fifths has-text-weight-bold is-size-7">Experience</div>
							<div className="column is-half is-size-7">{props.detail.base_experience}</div>

							<div className="column is-two-fifths has-text-weight-bold is-size-7">Abilities</div>
							<div className="column is-half is-size-7">
								{props.detail.abilities.map((val, i) => (
									<div key={`item-abilities-${i}`} className="is-clearfix is-capitalized">
										<span className="icon is-small has-text-danger m-r-5">
											<i className="fab fa-superpowers" />
										</span>
										{`${val.ability.name}`}
									</div>
								))}
							</div>
						</div>

						<div className="columns is-multiline is-gapless">
							<div className="column is-full m-b-5">
								<h3 className="has-text-weight-bold is-size-5 has-text-primary">Types</h3>
							</div>

							{props.detail.types.map((val, i) => (
								<React.Fragment key={`item-stat-name-${i}`}>
									<div className="column is-one-third has-text-weight-bold is-size-7 m-b-5 is-capitalized">
										<span className="icon is-small has-text-warning m-r-5">
											<i className="fas fa-bolt" />
										</span>
										{val.type.name}
									</div>
								</React.Fragment>
							))}
						</div>

						<div className="columns is-multiline is-gapless">
							<div className="column is-full m-b-5">
								<h3 className="has-text-weight-bold is-size-5 has-text-primary">Statistic</h3>
							</div>

							{props.detail.stats.map((val, i) => (
								<React.Fragment key={`item-stat-name-${i}`}>
									<div className="column is-two-fifths has-text-weight-bold is-size-7 m-b-5 is-capitalized">
										{val.stat.name}
									</div>
									<div className="column is-half is-size-7 m-b-5 is-capitalized">
										<div className="stat-cont">
											<div className="stat-value" style={{ width: `${val.base_stat > 100 ? 100 : val.base_stat}%` }}>
												<span className="p-r-5">{val.base_stat}</span>
											</div>
										</div>
									</div>
								</React.Fragment>
							))}
						</div>

						<div className="columns is-multiline is-gapless">
							<div className="column is-full hd-image-cont">
								<div className="cont bounce-4">
									<img src={props.detail.sprites.other.dream_world.front_default} alt={props.detail.name} />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
