
EWATode.Constant("5").log()
EWATode.Constant("+1").log()
EWATode.Constant("+1").log()
EWATode.Constant("0b0111").log()
EWATode.Constant("0xffff").log()
EWATode.Register("R3").log()
EWATode.Register("R?").log()

EWATode.WithoutComments("hi //lol").log().output.d
