export default function VariableTypes() {
    let numberVariable = 123; let true1 = true, false1 = false;
    let false2 = true1 && false1;
    let true2 = true1 || false1;
    let true3 = !false2;
    let true4 = numberVariable === 123; // always use === not == let true5 = floatingPointNumber !== 321.432;
    let false3 = numberVariable < 100;
    let true5 = !false2;
    return (
        <div id="wd-variable-types">
            <h4>Boolean Variables</h4>
            true1 = {true1 + ""} <br />
            false1 = {false1 + ""}  <br />
            false2 = {false2 + ""}  <br />
            true2 = {true2 + ""}  <br />
            true3 = {true3 + ""}  <br />
            true4 = {true4 + ""}  <br />
            true5 = {true5 + ""}  <br />
            false3 = {false3 + ""}  <br />
        </div>
    );
}