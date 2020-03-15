var round = (x) => Math.round(x*1000)/1000;  

function superSwap(str) {
	var out = [];

	for(var i=0; i<3; i++) {
		out[3-i] = str[(4+i)%6]
		out[(4+i)%6] = str[3-i]
	}

	return out.join("");
}

function makeMirror() {
	strategy = JSON.parse(document.getElementById('input').value);

	for (var pattern in strategy.patterns) {
		var q = strategy.patterns[pattern];

		q.commands.forEach(cmd => {
			if('move' in cmd) {
				cmd.move.x = round(3 - cmd.move.x);
				cmd.move.yaw = round(3.141 - cmd.move.yaw);
			}

			if('send_stm_cmd' in cmd) {
				if(cmd.send_stm_cmd.cmd == 'SetLowDynamixelsPoses') {
					cmd.send_stm_cmd.cmd_params = superSwap(cmd.send_stm_cmd.cmd_params);
				}

				if(cmd.send_stm_cmd.cmd == 'OpenStellaBlue' || cmd.send_stm_cmd.cmd == '0xb3') {
					cmd.send_stm_cmd.cmd = 'OpenStellaYellow';
				}

				if(cmd.send_stm_cmd.cmd == 'OpenStellaYellow' || cmd.send_stm_cmd.cmd == '0xb4') {
					cmd.send_stm_cmd.cmd = 'OpenStellaBlue';
				}
			}
		});
	}

	document.getElementById('output').value = JSON.stringify(strategy, null, '\t');
	console.log(JSON.stringify(strategy, null, '\t'));
}